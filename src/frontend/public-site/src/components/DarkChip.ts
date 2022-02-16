import { darkComponentHoc } from '@/utils/components';
import Vue from 'vue';
import { VChip } from 'vuetify/lib';

/**
 * HOC for v-btn that automatically applies the outlined prop when in dark mode.
 */
const darkChip = darkComponentHoc('dark-chip', VChip);
export default darkChip;
