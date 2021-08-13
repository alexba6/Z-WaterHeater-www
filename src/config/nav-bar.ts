import {NavBarSchema} from "../components/nav-bar/nav-bar";
import {
    faCogs,
    faHourglassEnd,
    faLayerGroup, faSignOutAlt,
    faThermometer, faThermometerFull,
    faThermometerThreeQuarters,
    faToggleOn
} from "@fortawesome/free-solid-svg-icons";


export const NavBarConfig: Array<NavBarSchema> = [
    {
        type: 'separator',
        options: {
            name: 'Général'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Control',
            icon: faToggleOn,
            target: '/control'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Température',
            icon: faThermometerThreeQuarters,
            target: '/temperature'
        }
    },
    {
        type: 'separator',
        options: {
            name: 'Paramètre'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Plages',
            icon: faHourglassEnd,
            target: '/time-slot'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Groupes',
            icon: faLayerGroup,
            target: '/output-group'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Sondes',
            icon: faThermometer,
            target: '/temp-sensor'
        }
    },
    {
      type: 'multiple',
      options: {
          name: 'Réglages',
          icon: faCogs,
          singleLinks: [
              {
                  name: 'Temp limite',
                  target: '/settings/temp-limit',
                  icon: faThermometerFull
              }
          ]
      }
    },
    {
        type: 'separator',
        options: {
            name: 'Compte'
        }
    },
    {
        type: 'single',
        options: {
            name: 'Déconnexion',
            icon: faSignOutAlt,
            target: '/logout'
        }
    }
]
