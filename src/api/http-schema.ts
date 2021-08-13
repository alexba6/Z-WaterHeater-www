
import {
    OutGroup,
    AuthKey,
    AuthToken,
    KeyInfo,
    ControlMode,
    TimeSlot
} from './type'
import {TempSensor} from "../type/tempSensor";
import {TemperatureData} from "../type/temperature";
import {Control} from "../type/control";
import {SettingsTempLimit} from "../type/settings";

export interface HttpApiSchema {
    '/api/auth/login': {
        post: {
            requestBody: {
                json: {
                    login: string,
                    password: string
                }
            },
            response: {
                200: AuthKey
            }
        }
    },
    '/api/auth/key-renew': {
        post: {
            auth: AuthKey,
            response: {
                200: AuthKey
            }
        }
    },
    '/api/auth/key-check': {
        post: {
            auth: AuthKey
        }
    },
    '/api/auth/logout': {
        post: {
            auth: AuthKey
        }
    },
    '/api/auth/key': {
        get: {
            auth: AuthKey,
            response: {
                200: {
                    logKeys: KeyInfo
                }
            }
        },
        delete: {
            auth: AuthKey
        }
    },
    '/api/auth/key/{keyId}': {
        delete: {
            auth: AuthKey,
            parameters: {
                path: {
                    keyId: string
                }
            }
        }
    },

    '/api/user': {
        post: {
            token: AuthToken,
            requestBody: {
                json: {
                    email: string,
                    password: string
                }
            }
        },
        get: {
            auth: AuthKey,
            response: {
                200: {
                    email: string
                }
            }
        },
        put: {
            auth: AuthKey,
            requestBody: {
                json: {
                    email?: string,
                    password?: string
                }
            }
        }
    },


    '/api/token/generate-code': {
        get: {
            response: {
                200: {
                    validTime: number
                }
            }
        }
    },
    '/api/token/check-code': {
        post: {
            requestBody: {
                json: {
                    code: string
                }
            },
            response: {
                200: {
                    token: string,
                    validTime: number
                }
            }
        }
    },

    '/api/control': {
        get: {
            auth: AuthKey,
            response: {
                200 : Control
            }
        }
    },
    '/api/control/{mode}': {
        post: {
            auth: AuthKey,
            parameters: {
                path: {
                    mode: ControlMode
                },
                query: {
                    groupId: string | null
                }
            }
        }
    },

    '/api/out-group': {
        get: {
            auth: AuthKey,
            response: {
                200: {
                    outGroups: Array<OutGroup>
                }
            }
        },
        post: {
            auth: AuthKey,
            requestBody: {
                json: {
                    name: string,
                    outId: Array<string>
                }
            },
            response: {
                201: {
                    group: OutGroup
                }
            }
        }
    },
    '/api/out-group/{groupId}': {
        put: {
            auth: AuthKey,
            parameters: {
                path: {
                    groupId: string
                }
            },
            requestBody: {
                json: {
                    name?: string,
                    outId?: Array<string>
                }
            }
        },
        delete: {
            auth: AuthKey,
            parameters: {
                path: {
                    groupId: string
                }
            }
        }
    },

    '/api/temp': {
        get: {
            auth: AuthKey,
            parameters: {
                query: {
                    date: string
                }
            },
            response: {
                200: {
                    data: Array<TemperatureData>,
                    date: string
                }
            }
        }
    },

    '/api/sensor': {
        get: {
            auth: AuthKey,
            response: {
                200: {
                    sensors: Array<TempSensor>
                }
            }
        }
    },
    '/api/sensor/{sensorId}': {
        put: {
            auth: AuthKey,
            parameters: {
                path: {
                    sensorId: string
                }
            }
            requestBody: {
                json: {
                    name?: string,
                    color?: string | null,
                    displayOnScreen?: boolean
                }
            }
        }
    },

    '/api/time-slot': {
        get: {
            auth: AuthKey,
            response: {
                200: {
                    timeSlots: Array<TimeSlot>
                }
            }
        },
        post: {
            auth: AuthKey,
            requestBody: {
                json: {
                    groupId: string,
                    start: string,
                    end: string
                }
            },
            response: {
                200: {
                    timeSlot: TimeSlot
                }
            }
        },
        put: {
            auth: AuthKey,
            requestBody: {
                json: Array<{
                    id: string,
                    groupId?: string,
                    start?: string,
                    end?: string
                }>
            }
        }
    },
    '/api/time-slot/{timeSlotId}': {
       delete: {
           auth: AuthKey,
           parameters: {
               path: {
                   timeSlotId: string
               }
           }
       }
    },

    '/api/settings/temp-limit': {
        get: {
            auth: AuthKey,
            response: {
                200: SettingsTempLimit
            }
        },
        put: {
            auth: AuthKey,
            requestBody: {
                json: SettingsTempLimit
            }
        }
    }
}
