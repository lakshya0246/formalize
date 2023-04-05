import { FormConfig, FormFields } from 'src/app/global-types';
import { STYLE_TEMPLATE_A } from './a.style-template';
import { TEMPLATE_A_BUTTON_1_ID, TEMPLATE_A_BUTTON_2_ID } from './a.constants';
import * as yup from 'yup';

export const CONFIG_TEMPLATE_A: FormConfig = {
  fields: [
    {
      id: 'name',
      title: 'Name',
      type: FormFields.TEXT,
      validationSchema: yup.string().required('Name is required'),
    },
    {
      id: 'email',
      title: 'Email',
      type: FormFields.EMAIL,
      validationSchema: yup.string().required('Email is required'),
    },
    {
      id: 'phone',
      title: 'Phone Number',
      type: FormFields.PHONE,
      validationSchema: yup
        .string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    },
    {
      id: 'age',
      title: 'Age',
      type: FormFields.NUMBER,
      validationSchema: yup
        .number()
        .min(18, 'Age is required and should be more than 18 years'),
    },
    {
      id: 'country',
      title: 'Country',
      type: FormFields.SELECT,
      validationSchema: yup.object().required('Please select a country'),
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
      title: 'Submit',
      type: 'submit',
    },
    {
      id: TEMPLATE_A_BUTTON_2_ID,
      title: 'Cancel',
      type: 'button',
    },
  ],
  styles: STYLE_TEMPLATE_A,
};
