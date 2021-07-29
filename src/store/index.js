import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalStorage, getLocalStorage, isThereADuplicate } from '@/core/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listEmployee: getLocalStorage('employeeList') ? getLocalStorage('employeeList') : [] // Check from localStorage else default empty array
  },
  mutations: {
    updateEmployee (state, employee) {
      if (!employee.isEdit && !isThereADuplicate(state.listEmployee, employee.id)) {
        state.listEmployee.push(employee)
        setLocalStorage('employeeList', state.listEmployee) // Updated to localStorage
      } else if (employee.isEdit) {
        const editEmp = state.listEmployee.find((item) => { return item.id === employee.id })
        editEmp.fn = employee.fn
        editEmp.ln = employee.ln
        editEmp.age = employee.age
        editEmp.email = employee.email
        editEmp.Companyname = employee.Companyname
        setLocalStorage('employeeList', state.listEmployee) // Updated to localStorage
      } else {
        console.log('Duplicate User ID')
        alert('Duplicate User ID', 'title', 'error')
      }
    },
    deleteEmployee (state, employee) {
      state.listEmployee.splice(employee.index, 1)
      setLocalStorage('employeeList', state.listEmployee) // Updated to localStorage
    }
  },
  actions: {
    updatelistEmployee ({ commit }, data) {
      commit('updateEmployee', data.employee)
    },
    deleteStoreEmployee ({ commit }, data) {
      commit('deleteEmployee', data.employee)
    }
  },
  modules: {
  }
})
