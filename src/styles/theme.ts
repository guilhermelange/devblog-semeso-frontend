import { extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react';

const config = {
  useSystemColorMode: true,
  initialColorMode: "dark"
}

const styles = {
  global: {
    body: {
      height: '100%',
      overflowY: 'scroll'
    },
    '#__next': {
      height: '100%'
    },
    // ":host,:root": {
    //   "--chakra-ui-focus-ring-color": "#FE8944"
    // }
  }
}

const colors = {
  white: '#EBEDEF',
  black: '#15171A',
  gray: {
    50: '#E6E6E6',
    100: '#E3E3E4',
    200: '#E0E0E1',
    300: '#DDDDDE',
    400: '#DADADB',
    500: '#D6D6D7',
    600: '#6D6E74',
    700: '#42444C',
    800: '#2D2F38',
    900: '#171923',
  },
  purple: {
    50: '#B081F4',
    100: '#A874F3',
    200: '#9F66F2',
    300: '#9557F1',
    400: '#8A46F0',
    500: '#7E34EE',
    600: '#732FD8',
    700: '#692BC4',
    800: '#5F27B2',
    900: '#5623A2',
  },
  orange: {
    50: '#FEB68B',
    100: '#FEAF7F',
    200: '#FE8944',
    300: '#FE9E64',
    400: '#FE9455',
    500: '#FE8944',
    600: '#E77D3E',
    700: '#D27238',
    800: '#BF6833',
    900: '#AE5F2E'
  },
  blue: {
    50: '#78BBFF',
    100: '#6BB5FF',
    200: '#5EAFFF',
    300: '#52A8FF',
    400: '#45A2FF',
    500: '#3491EE',
    600: '#2B79C7',
    700: '#2362A1',
    800: '#1B4B7A',
    900: '#123354',
  },

  green: {
    50: '#A1FF5E',
    100: '#9AFF52',
    200: '#92FF45',
    300: '#84F235',
    400: '#76E527',
    500: '#76D92F',
    600: '#61B227',
    700: '#4C8C1F',
    800: '#386616',
    900: '#23400E',
  },
  yellow: {
    50: '#FFFF80',
    100: '#FFFF6E',
    200: '#FFFF5C',
    300: '#FFFF4A',
    400: '#FFFF38',
    500: '#EEEE34',
    600: '#C7C722',
    700: '#A1A113',
    800: '#7A7A09',
    900: '#545402',
  },



}

const variantFocus = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)"
    }
  }
});

const shadows = {
  outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)"
}

const fonts = {
  heading: 'Lexend',
  body: 'Lexend'
}

const components = {
  Input: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Select: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Textarea: {
    variants: {
      outline: () => variantFocus().field,
      filled: () => variantFocus().field,
      flushed: () => variantFocus().field
    }
  }
}

export const theme = extendTheme({
  config,
  colors,
  shadows,
  fonts,
  components,
  styles
},
  // withDefaultColorScheme({
  //   components: ['Button', 'Badge'],
  // }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'NumberInput', 'PinInput'],
  }))