import { darkComponentHoc } from '@/utils/components';
import Vue from 'vue';
import { VBtn } from 'vuetify/lib';

/**
 * HOC for v-btn that automatically applies the outlined prop when in dark mode.
 */
const darkButton = darkComponentHoc('dark-button', VBtn);
export default darkButton;
