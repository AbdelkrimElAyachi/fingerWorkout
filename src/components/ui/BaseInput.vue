<template>
    <div class="space-y-1">
      <label v-if="label" :for="id" class="block text-font-medium text-textColor">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
      <p v-if="error" class="mt-1 text-sm text-error">{{ error }}</p>
      <p v-if="hint && !error" class="mt-1 text-sm text-secondary">{{ hint }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BaseInput',
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      },
      id: {
        type: String,
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`
      },
      type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url'].includes(value)
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      error: {
        type: String,
        default: ''
      },
      hint: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      inputClasses() {
        return [
          'text-black p-2 block w-full rounded-md shadow-sm transition',
          'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          this.error ? 'bg-red' : '',
          this.disabled ? 'bg-secondary cursor-not-allowed' : ''
        ].join(' ')
      }
    }
  }
  </script>