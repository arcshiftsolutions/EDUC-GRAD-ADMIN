<template>
  <b-container fluid class="m-0 p-0">
    <!-- User Interface controls -->
    <b-button-toolbar key-nav aria-label="Toolbar with button groups" class="float-left">
      <b-button-group class="mx-1">
        <b-button v-if="role=='administrator' && createAllowed" variant="success" size="sm" @click="addMode = !addMode" class="float-left">{{ addMode ? "Cancel":"Add " + title}}
        </b-button>
        <b-btn v-if="isAdmin && updateAllowed" v-bind:class="this.quickEdit?'btn-primary':'btn-primary'" size="sm" class="float-right" @click="toggleQuickEdit">Edit</b-btn>
      </b-button-group>
    
  </b-button-toolbar>
   
    <!--b-btn v-if="isAdmin && updateAllowed" v-bind:class="this.quickEdit?'btn-success':'btn-primary'" class="float-right" @click="toggleQuickEdit">Edit</b-btn-->
    <b-row>
      <b-col lg="7" class="px-0 float-left">
        <!--b-button v-if="role=='administrator' && createAllowed" variant="success" @click="addMode = !addMode" class="float-left">{{ addMode ? "Cancel":"Add " + title}}
        </b-button-->
      </b-col>
      <b-col sm="12" lg="5" class="my-1 table-filter" v-if="this.showFilter">
      
        <b-form-group label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm"
          class="mb-0 form-group-label">
          
          <b-input-group  >
            <div class="filter-icon p-2 text-secondary"><i class='fas fa-filter'></i></div>
            <b-form-input id="filter-input" size="md" v-model="filter" type="search" placeholder=""></b-form-input>
            <b-input-group-append>
              <b-button class="mr-10 clear-button" size="md" :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      
    </b-row>
    <b-row lg="12" v-if="addMode" class="card my-4">
        <b-card
          :title="'Add'+title"
          class="mb-1 mt-1"
        >
        <b-card-text>
          <div v-for="field in this.fields" v-bind:key="field.key" class="col-6">
            <div v-if="field.key != 'delete' && field.key != 'actions' && field.key != 'more' && field.editable">
              {{ field.label }} <b-input v-model="itemToAdd[field.key]"></b-input>
            </div>
          </div>
          <div class="col-12 my-3">
            <b-button-toolbar key-nav aria-label="Toolbar with button groups" class="float-left">
              <b-button variant="outline-primary" size="sm" @click="cancelAddItem" class="float-left btn-outline-primary">Cancel</b-button>
              <b-button variant="success" size="sm" @click="addItem" class="float-left"><i class="fas fa-plus"></i> Add</b-button>
            </b-button-toolbar>
          </div>
        </b-card-text>
      </b-card>
    </b-row>

    <!-- Main table element -->
     
    
    <b-table :responsive="responsive" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
      :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection" stacked="sm" sticky-header show-empty striped hover small @filtered="onFiltered">
      
         
      <template v-for="field in editableFields" v-slot:[`cell(${field.key})`]="{ value, item, field }">
       
        <b-input v-if="itemRow && itemRow[id] === item[id] && !deleteMode" v-on:keyup="validateInput" v-model="itemRow[field.key]" :type="field.type  || 'text'"
          :key="field.key" :number="field.isNumber" style="height:auto; padding: 0px;" class="pl-2">
        </b-input>
        
        <template v-else-if="itemRow && itemRow[id] === item[id] && deleteMode"><div :key="field.key"><del class="text-danger">{{ value }}</del></div></template>
        <template v-else> 
            <div v-if="quickEdit" class="px-2" @click='edit(item)' v-bind:key="field.key"> {{ value }} </div>
            <div v-if="!quickEdit" class="px-2" v-bind:key="field.key"> {{ value }} </div></template>
      </template>
   
      <template v-slot:cell(actions)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && editMode">
          <b-btn style="width: 60px;" variant="success" size="sm" @click="saveEdit">
            Save
          </b-btn>
          <!-- <b-btn variant="outline-primary" size="sm" @click="resetEdit">
            Cancel
          </b-btn> -->
        </b-button-group>
        <!-- <b-btn v-else-if="role=='administrator'" variant="primary" size="sm" @click="edit(item)" class="square">
          <i class="fas fa-edit"></i>
        </b-btn> -->
      </template>

  <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
    <slot :name="slotName" v-bind="scope"/>
  </template>
      <template v-slot:cell(delete)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && deleteMode">
          <b-btn variant="danger" size="sm" @click="deleteItem(item)">
            Delete
          </b-btn>
          <!-- <b-btn variant="outline-primary" size="sm" 
          @click="cancelDelete()">
            Cancel
          </b-btn> -->
        </b-button-group>
        
        <b-btn v-else-if="role=='administrator' && quickEdit" variant="danger" size="sm" @click="confirmDelete(item)"  class="square">
          <i class="fas fa-lg fa-times"></i>
        </b-btn>
      </template>
<!-- 
      <template #cell(more)="row">
        <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">
          <i class="fas fa-sm fa-caret-down"></i>
        </b-btn>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key, index) in row.item" :key="index">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>  -->

    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    props: ['items', 'title', 'fields', 'id', 'create','update','delete', 'slots', 'showFilter'],
    data() {
      return {
        responsive:true,
        quickEdit: false,
        isAdmin: false,
        updateAllowed: false,
        deleteAllowed: false,
        createAllowed: false,
        editMode: false,
        deleteMode: true,
        addMode: false,
        itemToAdd: [],
        showConfirm: false,
        checked: "false",
        itemRow: null,
        tableFields: "notloaded",
        editItem: "notloaded",
        totalRows: 1,
        currentPage: 1,
        perPage: 100,
        pageOptions: [10, 20, 50, {
          value: 100,
          text: "Show a lot"
        }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],

        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
      }
    },
    computed: {
      ...mapGetters({
        role: "getRoles",
      }),
      editableFields() {
        return this.fields.filter((field) => field.editable);
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {
              text: f.label,
              value: f.key
            }
          })
      }
    },
    created() {
//      console.log(this.fields[this.fields.length-1].class);
      window.addEventListener('keyup', this.validateInput)
      //Set up permissions from role
      this.setAdmin(this.role);
      
      //add Default Columns for table
      // this.fields.unshift({
      //   key: 'more', 
      //   label: 'More'
      // });
      //remove Columns based on permssions, create, update and delete props
      if(this.create && this.isAdmin){
        this.createAllowed = true;
      }
      if(this.update && this.isAdmin){
          this.updateAllowed = true;
           this.fields.push({
            key: 'actions',
            class: 'd-none',
            label: 'Edit'
          });
      }
      if(this.delete && this.isAdmin){
        this.deleteAllowed = true;
          this.fields.push({
            key: 'delete',
            class: 'd-none',
            label: 'Delete'
          });
      } 

      //this.itemToAdd = JSON.parse(JSON.stringify(this.items[0]));
      this.itemToAdd = {... this.items[0]} ;
      
      for(var i = 0; i < this.fields.length; i++){
        this.itemToAdd[this.fields[i].key] = "";
      }
    
      // for (var i = 0; i < this.fields.length; i++) {
      //   this.itemToAdd[this.fields[i].key] = "N/A";
      // }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
    },
    methods: {
      toggleQuickEdit(){
        this.quickEdit = !this.quickEdit;
        this.resetEdit();
        if(this.quickEdit){
          this.fields[this.fields.length-1].class = "d-block";
           this.fields[this.fields.length-2].class = "d-block";
          //  console.log(this.fields[this.fields.length-1].class);
        }else{
          this.fields[this.fields.length-1].class = "d-none";
          this.fields[this.fields.length-2].class = "d-none";
        }
      },
      validateInput: function(e){
        
          if (e.keyCode === 27){
            if(this.editMode){
              this.resetEdit();
            }else if(this.deleteMode){
              this.cancelDelete();
            }
          
          }else if (e.keyCode === 13) {
            if(this.quickEdit && this.editMode){
              this.saveEdit();
            }
          }
        

        
        
      },
      setAdmin(role){
        if(role == "administrator"){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      },
      addItem() {
        var newItem = this.itemToAdd;
        this.items.push(newItem);
      
        this.addMode = false;
        
        this.$bvToast.toast("Record was Added", {
          title: "Success",
          variant: 'success',
        });
        this.$store.dispatch(this.create, this.itemToAdd);
    
      },
      cancelAddItem() {
        this.addMode = false;
      },
      deleteItem(item) {
        this.$store.dispatch(this.delete, item[this.id]);
        this.items.splice(this.items.indexOf(item), 1)
        this.$bvToast.toast("Record was deleted", {
          title: "Success",
          variant: 'success',
        });
        this.cancelDelete();
        this.deleteMode = false;
      },
      confirmDelete(item) {
        
        this.deleteMode = true;
        this.editMode = false;
        let doDelete = true;
        if (
          this.itemRow &&
          !confirm(
            "You have unsaved changes, are you sure you want to continue?"
          )
        ) {
          doDelete = false;
        }

        if (doDelete) {
          this.itemRow = {
            ...item
          };
        }
      },
      edit(item) {
        this.editMode = true;
        this.deleteMode = false;
        let doEdit = true;
        if(!this.quickEdit){
          if ((this.itemRow && 
              !confirm(
                "You have unsaved changes, are you sure you want to continue?"
              ) )
          ) {
            doEdit = false;
          }
        }
        if (doEdit) {
          this.itemRow = {
            ...item
          };
        }
      },
      saveEdit() {
        let item = this.items.find((u) => u[this.id] === this.itemRow[this.id]);
        Object.assign(item, this.itemRow);
        this.$store.dispatch(this.update, item);
        this.resetEdit();
        this.$bvToast.toast("Record was saved/updated", {
          title: "Success",
          variant: 'success',
        });
      },
      cancelDelete() {
        this.itemRow = null;
        this.deleteMode = false;
      },
      resetEdit() {
        this.itemRow = null;
        this.editMode = false;
      },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
<style scoped>

/*
Media Queries
xs (for phones - screens less than 768px wide)
sm (for tablets - screens equal to or greater than 768px wide)
md (for small laptops - screens equal to or greater than 992px wide)
lg (for laptops and desktops - screens equal to or greater than 1200px
*/ 
@media (min-width: 992px){
  .col-lg-5.table-filter {
    position:absolute;
    right: 0;
    top: 10px;
  }
}
@media (max-width: 768px){
  .col-lg-5.table-filter {
    position:relative;
  }
}

.clear-button{
  background: #38598a;
}

</style>