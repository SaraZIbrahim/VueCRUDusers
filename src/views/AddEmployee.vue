<template>
  <div>
    <b-modal id="addNewEmployee" title="Add Employee">
      <b-form>
        <b-form-group
          id="input-group-6"
          label="User ID:"
          label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="user.id"
            type="text"
            unique
            :disabled="user.isEdit"
            placeholder="Enter User ID">
          </b-form-input>
          <span v-if="submitted && $v.user.id.$error" class="errorMsg">Please Enter User ID</span>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="User First Name:"
          label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.fn"
            type="text"
            required
            placeholder="Enter User First Name">
          </b-form-input>
          <span v-if="submitted && $v.user.fn.$error" class="errorMsg">Please Enter User First Name</span>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="User Last Name:"
          label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.ln"
            type="text"
            required
            placeholder="Enter User Last Name">
          </b-form-input>
          <span v-if="submitted && $v.user.ln.$error" class="errorMsg">Please Enter User Last Name</span>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="User Age:"
          label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.age"
            type="number"
            required
            placeholder="Enter User Age">
          </b-form-input>
          <span v-if="submitted && $v.user.age.$error" class="errorMsg">Please Enter User Age</span>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="User Email:"
          label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter User Email">
          </b-form-input>
          <div v-if="submitted && $v.user.email.$error" class="errorMsg">
            <span v-if="!$v.user.email.required">Please Enter Email address</span>
            <span v-if="$v.user.email && !$v.user.email.email">Please Enter Valid Email address</span>
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="User Company Name:"
          label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="user.Companyname"
            type="text"
            required
            placeholder="Enter User Company Name">
          </b-form-input>
          <span v-if="submitted && $v.user.Companyname.$error" class="errorMsg">
            <span v-if="!$v.user.Companyname.required">Please Enter Company Name</span>
            <span v-if="!$v.user.Companyname.minLength">Please Enter Minimum 10 character</span>
            <span v-if="!$v.user.Companyname.maxLength">Please Enter Maximum 12 character</span>
          </span>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right m-l-10"
            @click="submitForm">
            Save
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="resetForm">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BForm } from 'bootstrap-vue'
import { required, minLength, maxLength, email, integer } from 'vuelidate/lib/validators'

export default {
  name: 'add_new_employee',
  data () {
    return {
      user: {
        id: '',
        fn: '',
        ln: '',
        age: '',
        email: '',
        Companyname: ''
      },
      submitted: false
    }
  },
  validations: {
    user: {
      id: { required },
      fn: { required },
      ln: { required },
      age: { required, integer },
      email: { required, email },
      Companyname: { required, minLength: minLength(5), maxLength: maxLength(20) }
    }
  },
  mounted () {
    this.$root.$on('edit-employee', (data) => {
      this.user = data
      this.user.isEdit = true
      this.submitted = false
    })
    this.$root.$on('add-employee', (data) => {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    })
  },
  components: {
    'b-modal': BModal,
    'b-form': BForm
  },
  methods: {
    submitForm () {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$bvModal.hide('addNewEmployee')
      this.$store.dispatch('updatelistEmployee', { employee: this.user }) // dispatch store action
    },
    resetForm () {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    }
  }
}
</script>

<style>

</style>
