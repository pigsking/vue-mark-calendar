import { shallowMount } from '@vue/test-utils'
import Calendar from '@/components/calendar/Calendar.vue'


describe('props', () => {
  it('format=>date', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: { format: "YYYY-MM-DD" }
    })
    const dateObj = wrapper.vm.getDateObj('2020/2/14')
    expect(dateObj.date).toBe('2020-02-14')
  })

  it('sundayBegin=>weekText', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: { sundayBegin: true }
    })
    expect(wrapper.vm.weekTxt).toStrictEqual(["S", "M", "T", "W", "T", "F", "S"])
  })

  it('markers', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: {
        markers: [{
          date: '2020/01/16',
          className: "dream"
        }]
      }
    })
    expect(wrapper.contains('.dream')).toBe(true)
  })

  it('hideOtherMonthDay', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: {
        hideOtherMonthDay: true
      }
    })
    expect(wrapper.find('.other-month-day').isEmpty()).toBe(true)
  })

  it('hideOtherMonthMarker', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: {
        hideOtherMonthMarker: true,
        markers: [{
          date: '2020/02/01',
          className: "dream"
        }]
      }
    })
    wrapper.vm.chooseTargetDate('2020/01/20')
    expect(wrapper.contains('.dream')).toBe(false)
  })

  it('disabledFutureDay', () => {
    const wrapper = shallowMount(Calendar, {
      propsData: {
        disabledFutureDay: true,
      }
    })
    expect(wrapper.contains('.disabled-day')).toBe(true)
  })
})

