import { customer_array } from "../db/DB.js"
import Customer from "../model/Customer.js"

const cleanForm = () => {
  $("#customer-id").val("")
  $("#customer-name").val("")
  $("#customer-address").val("")
  $("#customer-salary").val("")
}

const cusromer = new Customer("C001", "Shamodha", "Colombo", "1000")
const cusromer2 = new Customer("C002", "Shamodha", "Colombo", "1000")
const cusromer3 = new Customer("C003", "Shamodha", "Colombo", "1000")
customer_array.push(cusromer)
customer_array.push(cusromer2)
customer_array.push(cusromer3)

const loadTable = () => {
  $("#customer-table-body").empty()
  customer_array.forEach((customer, index) => {
    const dataElement = `
    <tr>
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.address}</td>
      <td>${customer.salary}</td>
      <td>
        <button class="btn btn-warning btn-edit" data-index="${index}">Edit</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
      </td>
    </tr>`

    $("#customer-table-body").append(dataElement)
  })
}

// $(document).on("click", ".btn-edit", function () {
//   alert("kvfjb ")
// })

$(document).ready(() => {
  $(".btn-edit").on("click", function (e) {
    const index = $(this).data("index")

    const customer = customer_array[index]

    $("#customer-modal-title").text("Edit Customer")
    $("#customer-id").val(customer.id)
    $("#customer-name").val(customer.name)
    $("#customer-address").val(customer.address)
    $("#customer-salary").val(customer.salary)
    $("#edit-index").val(index)
    $("#btn-customer-save").text("Update")

    const modal = new bootstrap.Modal(
      document.getElementById("customer-form-modal")
    )
    modal.show()
  })
})

$("#btn-customer-save").on("click", (e) => {
  e.preventDefault()

  const customer_id = $("#customer-id").val()
  const customer_name = $("#customer-name").val()
  const customer_address = $("#customer-address").val()
  const customer_salary = $("#customer-salary").val()

  if (!customer_id || !customer_name || !customer_address || !customer_salary) {
    alert("All field required..!")
    return
  }

  // regex
  //   customer_array.length +1 - new id

  const cusromer = new Customer(
    customer_id,
    customer_name,
    customer_address,
    customer_salary
  )

  const editIndex = $("#edit-index").val()
  if (editIndex === "") {
    customer_array.push(cusromer)
  } else {
    customer_array[editIndex] = cusromer
  }

  loadTable()
  // cleanForm()
  
  const modalEl = document.getElementById("customer-form-modal")
  const modal = bootstrap.Modal.getInstance(modalEl)
  modal.hide()
})

loadTable()
