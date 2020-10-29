
export const colors = {
  white: "#fff",
  dodgerBlue: "#3cabff",
  "robin-s-egg": "#6be6fd",
  text: "#29292A",
  dark: "#29292A",
  black: '#000',
  lightBlue: "#0FCEF3",
  darkBlue: "#2B323C",
  gray: "#ababab",
  darkGray: "#888888",
  orange: '#EF8D24',
  green: '#21F14A',
  red: '#EE144C'
};

// const defaultTheme = createMuiTheme();
let customTheme =  {
  light: {
    typography: {
      useNextVariants: true,
    },
    name: 'light',
    mui: {
      typography: {
        fontFamily: ['Montserrat-Medium', 'sans-serif'].join(","),
        useNextVariants: true,
        h1: {
          letterSpacing: '0.5px',
          fontSize: 21,
          color: colors.white,
          lineHeight: "25px",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        h2: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          fontSize: '18px',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        h3: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-Bold', 'sans-serif'].join(","),
          fontSize: '18px',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          display: "inline-block"
        },
        h4: {
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          letterSpacing: '0.5px',
          color: colors.text,
          fontSize: '15px',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        h5: {
          letterSpacing: '0.5px',
          fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
          fontSize: '20px',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        h6: {
          letterSpacing: '0.5px',
          fontSize: '14px',
          fontWeight: '400',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        body1: {
          letterSpacing: '0.5px',
          fontSize: '14px'
        },
        body2: {
          letterSpacing: '0.5px',
          color: colors.gray,
          fontSize: '14px'
        },
        subtitle1: {
          fontSize: '14px',
          letterSpacing: '0.5px',
          color: colors.text
        },
        subtitle2: {
          fontSize: '12px',
          color: colors.darkGray
        }
      },
      type: 'light',
      overrides: {
        MuiList: {
          padding: {
            padding: '24px',
            paddingTop: '24px',
            paddingBottom: '24px',
          },
          root: {
            backgroundImage: "linear-gradient(#2B323C, #39495F)"
          }
        },
        MuiListItem: {
          root: {
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '5px'
          },
          gutters: {
            paddingLeft: '24px',
            paddingRight: '24px'
          },
          selected: {
            backgroundColor: '#1e849e !important'
          }
        },
        MuiListItemText: {
          primary: {
            color: colors.white,
            fontSize: '14px'
          }
        },
        MuiListSubheader: {
          root: {
            fontFamily: 'Montserrat-SemiBold',
            letterSpacing:  '1px',
            color: colors.white,
            paddingBottom: '12px',
            fontSize: '14px'
          }
        },
        MuiMenuItem: {
          root: {
            height: 'auto'
          }
        },
        MuiDivider: {
          root: {
            height: '2px',
            backgroundColor: colors.white,
            marginTop: '42px',
            marginBottom: '42px'
          }
        },
        MuiStepConnector: {
          lineVertical: {
            minHeight: '50px',
          },
          vertical: {
            padding: '0px'
          }
        },
        MuiStepContent: {
          root: {
            marginTop: '0px'
          }
        },
        MuiStepIcon: {
          root: {
            color: colors.darkGray
          },
          active: {
            color: colors.darkGray+"!important",
            fontSize: '34px',
            marginLeft: '-5px'
          },
          completed: {
          },
          text: {
            fill: colors.darkGray
          }
        },
        MuiStepLabel: {
          label: {
            color: colors.white,
            letterSpacing: '0.5px',
            fontSize: '14px',
            marginLeft: '12px'
          },
          active: {
            marginLeft: '7px',
            color: colors.white+' !important'
          }
        },
        MuiInput: {
          underline: {
            '&:before': { //underline color when textfield is inactive
              backgroundColor: colors.black,
              height: '1px'
            },
            '&:hover:not($disabled):before': { //underline color when hovered
              backgroundColor: colors.black,
              height: '1px'
            },
            '&:after': { //underline color when textfield is inactive
              backgroundColor: colors.lightBlue,
              borderBottom: "2px solid "+colors.lightBlue,
              height: '1px'
            },
          }
        },
        MuiFormLabel: {
          root: {
            color: '#c0c0c0',
            fontSize: '15px',
            letterSpacing: '0.5px'
          }
        },
        MuiInputBase: {
          root: {
            color: colors.black
          },
          input: {
            letterSpacing: '0.5px'
          }
        },
        MuiInputLabel: {
          root: {
            letterSpacing: '0.5px'
          },
          focused: {
            color: colors.lightBlue+" !important"
          }
        },
        MuiButton: {
          root: {
            borderRadius: '4px'
          },
          contained: {
            backgroundColor: colors.white
          },
          label: {
            textTransform: 'none',
            letterSpacing: '0.5px'
          },
          sizeLarge: {
            fontSize: '16px',
            padding: '12px 34px',
            minWidth: '230px'
          },
          sizeSmall: {
            fontFamily: ['Montserrat-SemiBold', 'sans-serif'].join(","),
            fontSize: '12px',
            padding: '10px 12px',
            minWidth: '100px'
          },
          text: {
            border: '1px solid'
          }
        },
        MuiCard: {
          root: {
            borderRadius: 0
          }
        },
        MuiTab: {
          textColorPrimary: {
            color: colors.black,
            "&$selected": {
              color: colors.black
            }
          }
        },
        MuiSnackbar : {
          anchorOriginBottomLeft: {
            bottom: '50px',
            left: '80px',
            '@media (min-width: 960px)': {
              bottom: '50px',
              left: '80px'
            }
          }
        },
        MuiSnackbarContent: {
          root: {
            backgroundColor: colors.white,
            padding: '0px',
            minWidth: '450px',
            '@media (min-width: 960px)': {
              minWidth: '450px',
            }
          },
          message: {
            padding: '0px'
          },
          action: {
            marginRight: '0px'
          }
        },
        MuiPaper: {
          elevation1: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          },
          elevation2: {
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          }
        },
        MuiTable: {
          root: {
            borderSpacing: '0 15px',
            borderCollapse: 'separate'
          }
        },
        EnhancedTable: {
          tableWrapper: {
            overflowX: 'inherit'
          }
        },
        MuiTableCell: {
          root: {
            borderBottom: 'none',
            padding: "12px 0px 12px 24px"
          }
        },
        MuiTableHead: {
          root: {
            padding: '16px',
            backgroundColor: '#2f3031'
          }
        },
        MuiTableSortLabel: {
          root: {
            color: colors.white,
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            '&:hover': {
              color: colors.white
            },
            '&:focus': {
              color: colors.white
            }
          },
          active: {
            color: colors.white
          }
        },
        MuiTableRow: {
          root: {
            marginTop: '8px',
            marginBottom: '8px',
            boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 2px 0px rgba(0, 0, 0, 0.14), 3px 6px 2px 2px rgba(0, 0, 0, 0.12)'
          }
        },
        MuiToolbar: {
          gutters: {
            padding: '0px',
            paddingLeft: '0px',
            '@media (min-width: 600px)': {
              padding: '0px',
              paddingLeft: '0px',
            }
          }
        },
        MuiCheckbox: {
          root: {
            color: colors.text
          }
        },
        MuiFormControlLabel: {
          label: {
            color: colors.text,
            letterSpacing: '0.5px',
            fontSize: '12px'
          },
          outlined: {
            borderWidth: 2,
          },
          outlinedSecondary: {
            borderWidth: 2,
            color: "white",
          },
          sizeSmall: {
            padding: '10px 20px'
          }
        },
        MuiDialogContent: {
          root: {
            padding: '0px 12px 12px 32px'
          }
        },
        MuiCardContent: {
          root: {
            padding: '30px 40px'
          }
        },
        MuiExpansionPanel: {
          root: {
            boxShadow: 'none',
            '&:before': {
              opacity: '0'
            },
          }
        },
        MuiExpansionPanelDetails: {
          root: {
            padding: '0px'
          }
        },
        MuiExpansionPanelSummary: {
          root: {
            padding: '0px'
          }
        },
        MuiDialog: {
          paper: {
            margin: '0px'
          }
        },
        MuiPickersToolbar: {
          toolbar: {
            padding: 20
          }
        }
      },
      palette: {
        primary: {
          main: colors.lightBlue,
          contrastText: colors.white
        },
        secondary: {
          main: colors.text
        },
        background:{
          paper: colors.white,
        },
        text: {
          primary: colors.text,
          secondary: colors.gray
        }
      }
    },
    custom: {
      page: {
        padding: '0px'
      },
      drawerContainer:  {
        display: 'flex'
      },
      mainContainer: {
        minHeight: "924px",
        position: "relative",
        flex: 1,
        marginLeft: '100px',
        marginRight: '24px'
      },
      drawer: {
        background: colors.darkBlue,
        flex: '1',
        minWidth: '260px',
        height: '100%'
      },
      headingBorder: {
        color: colors.darkBlue
      },
      footer: {
        background: '#2b323c'
      },
      logout: {
        border: '1px solid #1e849e',
        marginTop: '60px'
      },
      logoutText: {
        textAlign: 'center'
      },
      pageTitle: {
        flex: 1,
        paddingTop: "48px",
        paddingBottom: '60px',
        display: "flex"
      },
      pageTitleRoot: {
        color: colors.lightBlue,
        cursor: 'pointer'
      },
      sectionTitle: {
        marginTop: '60px',
        marginBottom: '36px'
      },
      accountsContainer: {
        width: 'calc(100% + 48px)',
        marginLeft: '-24px'
      },
      primaryText: {
        background: colors.lightBlue,
        fontSize: '10px',
        padding: '2px 6px',
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: '12px',
        borderRadius: '3px'
      },
      icon: {
        color: colors.darkGray
      },
      appBar: {
        background: colors.darkBlue,
        padding: '12px'
      },
      welcomeBase: {
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        position: 'absolute'
      },
      welcomeCurve: {
        fontSize: '40px',
        letterSpacing: '2px',
        color: colors.white,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      welcomeText: {
        fontSize: '35px',
        letterSpacing: '2px',
        color: colors.white,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      welcomeContent: {
        marginTop: 'calc(50vh - 80px)',
        transform: 'translate(0%, -50%)'
      },
      forgotPassword: {
        fontSize: "12px",
        cursor: "pointer",
        color: colors.lightBlue,
        marginTop: '24px',
        marginBottom: '24px'
      },
      resendConfirmationEmail: {
        fontSize: "13px",
        cursor: "pointer",
        margin: '0 auto',
        marginTop: "60px",
        color: colors.text,
        textAlign: "center",
      },
      tickIcon: {
        color: colors.lightBlue,
        fontSize: '60px'
      },
      inline: {
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      positive: {
        color: colors.green
      },
      tokenInfo: {
        paddingTop: '24px'
      },
      tokenPair: {
        padding: '8px 0px'
      },
      tokenValue: {
        fontFamily: 'Montserrat-SemiBold'
      }
    }
  }
};

export default customTheme;
