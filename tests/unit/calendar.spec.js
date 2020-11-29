import { shallowMount } from '@vue/test-utils'
import dayjs from 'dayjs'
import Calendar from '../../packages/calendar'

const factory = (propsData) => {
  return shallowMount(Calendar, {
    propsData: propsData
  })
}

describe('init', () => {
  it('choose', () => {
    const wrapper = factory()

    const todayDate = dayjs().format('YYYY/MM/DD')
    wrapper.vm.chooseDate(todayDate)
    expect(wrapper.vm.currentDate).toBe(todayDate)
  })

  it('emit', () => {
    const wrapper = factory()

    wrapper.vm.$emit('date')
    expect(wrapper.emitted('date')).toBeTruthy()
  })
})

describe('methods', () => {
  it('chooseDate', () => {
    const wrapper = factory()

    wrapper.vm.chooseDate('2020/09/30')
    expect(wrapper.vm.currentDate).toBe('2020/09/30')
  })
})

// describe('events', () => {
//   it('date', () => {
//     const wrapper = factory()

//     wrapper.vm.$emit('date')
//     expect(wrapper.emitted('date')).toBeTruthy()
//   })
// })

// describe('classes', () => {
//   it('choose-day', () => {
//     const wrapper = factory()

//     wrapper.vm.chooseDate('2020/09/30')

//     expect(wrapper.vm.currentDate).toBe('2020/09/30')
//     expect(wrapper.find('.choose-day').element.text()).toBe('30')
//   })
// })

describe('props', () => {
  it('format => default', () => {
    const wrapper = factory({
      format: "YYYY/MM/DD"
    })

    expect(wrapper.vm.currentDate).toBe(dayjs().format("YYYY/MM/DD"))
  })

  it('format = YYYY/M/D', () => {
    const wrapper = factory({
      format: "YYYY/M/D"
    })

    expect(wrapper.vm.currentDate).toBe(dayjs().format("YYYY/M/D"))
  })

  it('format = YYYY/MM/DD', () => {
    const wrapper = factory({
      format: "YYYY/MM/DD"
    })

    expect(wrapper.vm.currentDate).toBe(dayjs().format("YYYY/MM/DD"))
  })

  it('format = YYYY/M/D', () => {
    const wrapper = factory({
      format: "YYYY/M/D"
    })

    expect(wrapper.vm.currentDate).toBe(dayjs().format("YYYY/M/D"))
  })

  it('weekText => default', () => {
    const wrapper = factory()

    expect(wrapper.vm.weekTxt).toStrictEqual(["一", "二", "三", "四", "五", "六", "日"])
  })

  it('weekText => custom', () => {
    const wrapper = factory({
      weekText: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    })

    expect(wrapper.vm.weekTxt).toStrictEqual(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
  })

  it('sundayBegin => default', () => {
    const wrapper = factory()

    expect(wrapper.vm.weekTxt).toStrictEqual(["一", "二", "三", "四", "五", "六", "日"])
  })

  it('sundayBegin = true', () => {
    const wrapper = factory({
      sundayBegin: true,
    })

    expect(wrapper.vm.weekTxt).toStrictEqual(["日", "一", "二", "三", "四", "五", "六"])
  })

  it('sundayBegin = true => custom week text', () => {
    const wrapper = factory({
      sundayBegin: true,
      weekText: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    })

    expect(wrapper.vm.weekTxt).toStrictEqual(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
  })

  // it('markers', () => {
  //   const wrapper = factory({
  //     markers: [{
  //       date: dayjs().format('YYYY/MM/DD'),
  //       className: "love"
  //     }]
  //   })

  //   expect(wrapper.find('.love').exists()).toBe(true)
  // })

  // it('hideOtherMonthDay', () => {
  //   const wrapper = factory({
  //     hideOtherMonthDay: false
  //   })

  //   expect(wrapper.find('.other-month-day').exists()).toBe(false)
  // })

  // it('hideOtherMonthMarker', () => {
  //   const wrapper = shallowMount(Calendar, {
  //     propsData: {
  //       hideOtherMonthMarker: true,
  //       markers: [{
  //         date: '2020/02/01',
  //         className: "dream"
  //       }]
  //     }
  //   })
  //   wrapper.vm.chooseDate('2020/01/20')
  //   expect(wrapper.contains('.dream')).toBe(false)
  // })

  // it('hideMarker', () => {
  //   const wrapper = shallowMount(Calendar, {
  //     propsData: {
  //       hideOtherMonthMarker: true,
  //       markers: [{
  //         date: '2020/09/14',
  //         className: "dream"
  //       }]
  //     }
  //   })
  //   wrapper.vm.chooseDate('2020/09/30')
  //   expect(wrapper.contains('.dream')).toBe(false)
  // })

  // it('disabledFutureDay', () => {
  //   const wrapper = shallowMount(Calendar, {
  //     propsData: {
  //       disabledFutureDay: true
  //     }
  //   })
  //   expect(wrapper.contains('.future-day')).toBe(true)
  // })
})

