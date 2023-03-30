import { extendTheme } from "@chakra-ui/react"
export const colors = {
  primaryColor : "rgba(50, 138, 241, 1)",
  primaryDarkColor :'rgba(21, 31, 50, 1)',
  secondaryColor : '#FCE38A',

  textColor : '#fff',
  decsColor : "rgba(120, 144, 156,1)",
  bgColor : "rgba(21, 31, 50, 1)",
  backgroundBtnColor : "rgba(50,138,241,.2)",
  backgroundBtnColor_hover : "rgba(50,138,241,.25)",
  bgScoreColor : 'rgba(14, 23, 37, .25)',

  dividerColor : 'rgba(255,255,255,.2)',
  starColor : '#f1c40f',
}
const layerStyles = {
  containerStyles : {
    px: {
      base: "10px",
      lg: "0px",
    },
    maxW : "1100px",
    mx : "auto",
    w : "full",
  },
  absCenter : {
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)'
  },
  flexCenter : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
  }
}
const fonts = {
  body : "'Exo 2', sans-serif",
  heading : "'Exo 2', sans-serif",

}
const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
}
const spacing = {
  space : {
    px : '1px',
    '1xl': "10px",
    '2xl': "20px",
    '3xl': "30px",
    '4xl': "40px",
  }
}

const colorModeConfig = {
  styles: {
    global: (props) => ({
      'html, body': {
        // bg :  props.colorMode === 'dark'  ? '#1B1B1B' : 'rgb(255 240 255)',
      },
    }),
  },
}

const chakraConfig = extendTheme({
  ...colorModeConfig,
  colors,
  breakpoints,
  spacing,
  fonts,
  layerStyles,
  config : {
    initialColorMode : 'dark'
  }
})

export default chakraConfig