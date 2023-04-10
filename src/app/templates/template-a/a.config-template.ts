import { FormConfig, FormFields } from 'src/app/global-types/config';
import { TEMPLATE_A_BUTTON_1_ID, TEMPLATE_A_BUTTON_2_ID } from './a.constants';
import { STYLE_TEMPLATE_A } from './a.style-template';

export const CONFIG_TEMPLATE_A: FormConfig = {
  fields: [
    {
      id: 'name',
      label: 'Name',
      type: FormFields.TEXT,
      placeholder: 'Enter your name',
    },
    {
      id: 'email',
      label: 'Email',
      type: FormFields.EMAIL,
      placeholder: 'john.doe@gmail.com',
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: FormFields.PHONE,
      placeholder: '+91 xxxxx xxxxx',
    },
    {
      id: 'age',
      label: 'Age',
      type: FormFields.NUMBER,
      placeholder: 'Age should be above 18',
    },
    {
      id: 'country',
      label: 'Country',
      type: FormFields.SELECT,
      options: [
        {
          label: 'USA',
          value: 'usa',
        },
        {
          label: 'Canada',
          value: 'canada',
        },
        {
          label: 'UK',
          value: 'uk',
        },
      ],
    },
  ],
  buttons: [
    {
      id: TEMPLATE_A_BUTTON_1_ID,
      label: 'Submit',
      type: 'submit',
    },
    {
      id: TEMPLATE_A_BUTTON_2_ID,
      label: 'Cancel',
      type: 'button',
    },
  ],
  styles: STYLE_TEMPLATE_A,
};
