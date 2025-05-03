<template>
    <button
      :type="type"
      :disabled="disabled"
      :class="buttonClasses"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'BaseButton',
    props: {
      type: {
        type: String,
        default: 'button',
        validator: (value) => ['button', 'submit', 'reset'].includes(value)
      },
      variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
      },
      size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fullWidth: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      buttonClasses() {
        return [
          'rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
          this.variantClasses,
          this.sizeClasses,
          this.fullWidth ? 'w-full' : '',
          this.disabled ? 'opacity-50 cursor-not-allowed' : ''
        ].join(' ')
      },
      variantClasses() {
        const variants = {
          primary: 'bg-primary text-backgroundColor hover:opacity-50 focus:ring-gray-500',
          secondary: 'bg-secondary text-white hover:bg-secondary/50 focus:ring-gray-500',
          outline: 'border border-primary bg-backgroundColor text-textColor hover:opacity-50 focus:ring-gray-500',
          text: 'text-textColor hover:text-textColor/50 focus:ring-gray-500 bg-transparent'
        }
        return variants[this.variant]
      },
      sizeClasses() {
        const sizes = {
          small: 'px-3 py-1.5 text-sm',
          medium: 'px-4 py-2 text-base',
          large: 'px-6 py-3 text-lg'
        }
        return sizes[this.size]
      }
    }
  }
  </script>