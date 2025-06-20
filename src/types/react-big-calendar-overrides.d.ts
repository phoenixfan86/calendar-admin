import { View } from 'react-big-calendar';

declare module 'react-big-calendar' {
  export interface Views {
    year: View
  }
}