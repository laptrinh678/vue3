<template>
  <div>
    <p>Interpalation và data</p>
    <p>{{ message }}</p>
    <p>{{ number + 5 }}</p>
    <p>{{ form.name }}</p>
    <p>{{ convert() }}</p>
    <button @click="showData(8)">show data</button>
    <p>{{ age}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "hab222",
      number: 10,
      age: null,
      form: {
        name: "lapvt",
        email: "hab",
      },
    };
  },
  methods: {
    convert() {
      return "đây là một phương thức";
    },
    showData(age) {
        console.log(age)
        this.age = age

    }
  },
};
</script>