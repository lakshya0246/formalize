import { DimensionalProperty, FormStyles } from '../../global-types/styles';
import { TEMPLATE_A_BUTTON_1_ID, TEMPLATE_A_BUTTON_2_ID } from './a.constants';

const DEFAULT_PADDING: DimensionalProperty = new DimensionalProperty(
  20,
  20,
  5,
  5
);

export const STYLE_TEMPLATE_A: FormStyles = {
  borderRadius: 5,
  horizontalGap: 10,
  verticalGap: 20,
  buttons: [
    {
      buttonId: TEMPLATE_A_BUTTON_1_ID,
      defaultStyles: {
        width: '100%',
        backgroundColor: '#007bff',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#007bff',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      hoverStyles: {
        width: '100%',
        backgroundColor: '#0069d9',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#0062cc',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      focusStyles: {
        width: '100%',
        backgroundColor: '#0069d9',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#0062cc',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      activeStyles: {
        width: '100%',
        backgroundColor: '#0062cc',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#005cbf',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
    },
    {
      buttonId: TEMPLATE_A_BUTTON_2_ID,
      defaultStyles: {
        width: '100%',
        backgroundColor: '#007bff',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#007bff',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      hoverStyles: {
        width: '100%',
        backgroundColor: '#0069d9',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#0062cc',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      focusStyles: {
        width: '100%',
        backgroundColor: '#0069d9',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#0062cc',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
      activeStyles: {
        width: '100%',
        backgroundColor: '#0062cc',
        color: '#fff',
        borderWidth: 0,
        borderColor: '#005cbf',
        fontSize: 16,
        fontColor: '#fff',
        height: 40,
        padding: DEFAULT_PADDING,
      },
    },
  ],
  input: {
    inputId: 'first-name',
    defaultStyles: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#CCCCCC',
      fontSize: 14,
      fontColor: '#000000',
      height: 30,
      padding: DEFAULT_PADDING,
      labelFontSize: 14,
      labelFontColor: '#000000',
      placeholderFontSize: 14,
      placeholderFontColor: '#CCCCCC',
    },
    hoverStyles: {
      width: '100%',
      backgroundColor: '#F0F0F0',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#CCCCCC',
      fontSize: 14,
      fontColor: '#000000',
      height: 30,
      padding: DEFAULT_PADDING,
      labelFontSize: 14,
      labelFontColor: '#000000',
      placeholderFontSize: 14,
      placeholderFontColor: '#CCCCCC',
    },
    focusStyles: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#4C9AFF',
      fontSize: 14,
      fontColor: '#000000',
      height: 30,
      padding: DEFAULT_PADDING,
      labelFontSize: 14,
      labelFontColor: '#4C9AFF',
      placeholderFontSize: 14,
      placeholderFontColor: '#CCCCCC',
    },
    invalidStyles: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#FF4C4C',
      fontSize: 14,
      fontColor: '#000000',
      height: 30,
      padding: DEFAULT_PADDING,
      labelFontSize: 14,
      labelFontColor: '#FF4C4C',
      placeholderFontSize: 14,
      placeholderFontColor: '#CCCCCC',
    },
    validStyles: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#66FF66',
      fontSize: 14,
      fontColor: '#000000',
      height: 30,
      padding: DEFAULT_PADDING,
      labelFontSize: 14,
      labelFontColor: '#66FF66',
      placeholderFontSize: 14,
      placeholderFontColor: '#CCCCCC',
    },
  },
};
