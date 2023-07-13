import type {Cons} from '../component'
import type {OptionBuilder} from '../optionBuilder'
import {obtainSlot, optoinNullableMemberDecorator} from '../utils'
import {mapGetters} from 'vuex';

export type GetterConfig = any

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, access: GetterConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('getter');
    map.set(name, access)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('getter')!
    if (names) {
        names.forEach((value, name) => {
            if (!optionBuilder.computed) {
                optionBuilder.computed = {};
            }
            const mapObject = {[name]: value}
            optionBuilder.computed[name] = mapGetters(mapObject)[name]
        })
    }
}
