
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Prop, State } from '../../dist'
import { mount } from '@vue/test-utils'

@Component
export class Comp extends Base {
    data = 'data value'
    @Prop
    prop!: string
    @State
    state: string = 'test'
    fieldInitProp = this.prop
}

const CompContext = Comp as any

describe('option data',
    () => {
        it('default', () => {
            const vm = mount(CompContext, {
                props: {
                    prop:'prop test'
                }
            }).vm

            expect('function').to.equal(typeof CompContext?.data)
            expect('data value').to.equal(CompContext.data().data)
            expect(CompContext.data().state).to.equal(undefined)
            expect(2).to.equal(Object.keys(CompContext.data()).length)
            expect('prop test').to.equal(vm.fieldInitProp)
        })
    }
)
export default {}
