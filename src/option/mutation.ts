import type {Cons} from '../component'
import type {OptionBuilder} from '../optionBuilder'
import {obtainSlot, optoinNullableMemberDecorator} from '../utils'
import {mapMutations} from 'vuex';

export type MutationConfig = any

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, access: MutationConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('mutation');
    map.set(name, access)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('mutation')!
    if (names) {
        names.forEach((value, name) => {
            if (!optionBuilder.methods) {
                optionBuilder.methods = {};
            }
            const mapObject = {[name]: value}
            optionBuilder.methods[name] = mapMutations(mapObject)[name]
        })
    }
}
