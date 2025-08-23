import { socket } from '@/plugins/socket';
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export function useSocket(events = {}) {
    // events: { eventName: callback }
    const state = ref({}); // reactive state for game/chat data

    const connect = () => socket.connect();
    const disconnect = () => socket.disconnect();

    const emit = (event, payload, cb) => {
        socket.emit(event, payload, cb);
    };

    const registerEvents = () => {
        Object.entries(events).forEach(([event, handler]) => {
            socket.on(event, handler);
        });
    };

    const unregisterEvents = () => {
        Object.keys(events).forEach(event => {
            socket.off(event);
        });
    };

    onMounted(() => {
        const authStore = useAuthStore();
        socket.auth = { email: authStore.email };
        connect();
        registerEvents();
    });

    onUnmounted(() => {
        unregisterEvents();
        disconnect();
    });

    return {
        state,
        emit,
        connect,
        disconnect
    };
}
