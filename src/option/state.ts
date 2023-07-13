import type {Cons} from '../component'
import type {OptionBuilder} from '../optionBuilder'
import {obtainSlot, optoinNullableMemberDecorator} from '../utils'
import {mapState} from 'vuex';

export type StateConfig = any

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, access: StateConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('state');
    map.set(name, access)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('state')!
    if (names) {
        names.forEach((value, name) => {
            if (!optionBuilder.computed) {
                optionBuilder.computed = {};
            }
            const mapObject = {[name]: value}
            optionBuilder.computed[name] = mapState(mapObject)[name]
        })
    }
}
