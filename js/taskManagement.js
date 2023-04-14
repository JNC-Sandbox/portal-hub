var options = {
    valueNames: [ 'id', 'name', 'age', 'city' ]
  };
  
  // Init list
  var contactList = new List('contacts', options);
  
  var idField = $('#id-field'),
      nameField = $('#name-field'),
      ageField = $('#age-field'),
      cityField = $('#city-field'),
      addBtn = $('#add-btn'),
      editBtn = $('#edit-btn').hide(),
      removeBtns = $('.remove-item-btn'),
      editBtns = $('.edit-item-btn'),
      doneCheck = $('.done-checkbox'),
      doneUncheck = $('.complete-checkbox'),
      doneIdField = $('.done-id');


  var completedList = new List('completed', options);

  
  // Sets callbacks to the buttons in the list
  //refreshCallbacks();
  
  addBtn.click(function() {
    contactList.add({
      id: Math.floor(Math.random()*110000),
      name: nameField.val(),
      age: ageField.val(),
      city: cityField.val()
    });
    clearFields();
    refreshCallbacks();
  });
  
  editBtn.click(function() {
    var item = contactList.get('id', idField.val())[0];
    item.values({
      id:idField.val(),
      name: nameField.val(),
      age: ageField.val(),
      city: cityField.val()
    });
    clearFields();
    editBtn.hide();
    addBtn.show();
  });
  
  function refreshCallbacks() {
    // Needed to add new buttons to jQuery-extended object
    removeBtns = $(removeBtns.selector);
    editBtns = $(editBtns.selector);
    doneCheck = $(doneCheck.selector);
    doneUncheck = $(doneUncheck.selector);

    doneCheck.click(function() {
        removeButtons(this);
    });

    doneUncheck.click(function() {
        console.log('In click of uncheck');
       moveItemBack(this); 
    });
    
    removeBtns.click(function() {
        removeButtons(this)
    //   console.log('Remove button');
    //   var itemId = $(this).closest('tr').find('.id').text();
    //   contactList.remove('id', itemId);
    });
    
    editBtns.click(function() {
      var itemId = $(this).closest('tr').find('.id').text();
      var itemValues = contactList.get('id', itemId)[0].values();
      idField.val(itemValues.id);
      nameField.val(itemValues.name);
      ageField.val(itemValues.age);
      cityField.val(itemValues.city);
      
      editBtn.show();
      addBtn.hide();
    });
  }

  function removeButtons(context) {
    console.log('Remove button');
    var itemId = $(context).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
console.log(itemValues);
    completedList.add({
        id: itemValues.id,
        name: itemValues.name,
        age: itemValues.age,
        city: itemValues.city
      });

      contactList.remove('id', itemId);
      refreshCallbacks();
  }

  function moveItemBack(context) {
    console.log(completedList);

    console.log('Move back button');
    console.log(context);
    var itemId = $(context).closest('tr').find('.done-id').text();
console.log(itemId);
    var itemValues = completedList.get('id', itemId)[0].values();
console.log(itemValues);
    contactList.add({
        id: itemValues.id,
        name: itemValues.name,
        age: itemValues.age,
        city: itemValues.city
      });

      completedList.remove('id', itemId);
      refreshCallbacks();
  }
  
  function clearFields() {
    nameField.val('');
    ageField.val('');
    cityField.val('');
  }

  // call on load of webpage
$(document).ready(function() {
    console.log('On Load');
    var item = completedList.get('id', doneIdField.val())[0].values();
    console.log(item);
    completedList.remove('id', item.id);
    refreshCallbacks();
});