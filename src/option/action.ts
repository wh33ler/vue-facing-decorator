import type {Cons} from '../component'
import type {OptionBuilder} from '../optionBuilder'
import {obtainSlot, optoinNullableMemberDecorator} from '../utils'
import {mapActions} from 'vuex';

export type ActionConfig = any

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, access: ActionConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('action');
    map.set(name, access)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('action')!
    if (names) {
        names.forEach((value, name) => {
            if (!optionBuilder.methods) {
                optionBuilder.methods = {};
            }
            const mapObject = {[name]: value}
            optionBuilder.methods[name] = mapActions(mapObject)[name]
        })
    }
}
