import type { InjectionKey } from 'vue'

import { MeteoService } from './interface_type/service'

export const MeteoServiceKey = Symbol() as InjectionKey<MeteoService>