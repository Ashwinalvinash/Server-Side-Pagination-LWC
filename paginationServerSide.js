import { LightningElement, track } from 'lwc';
import getAccountDataserverSide from '@salesforce/apex/AccountFetchForServerSidePagination.getAccountDataserverSide' ;

export default class PaginationServerSide extends LightningElement {
 
    @track accountList = [] ;
    @track recordsPerPage  = 5 ;
    @track currentPage = 1 ;
    @track totalPage ;
    @track totalrecords ;
    @track diplayedPageNumbers = [] ;
    @track showData ;
    @track offSet = 0 ;
    

    connectedCallback(){
         this.fetchAccountData();
    }
    fetchAccountData(){
        //Imperative calling
        getAccountDataserverSide({limitVal : this.recordsPerPage,offsetVal : this.offSet}).then(result =>{
         console.log('Enter inner method');
         this.accountList = result.accountSingleList ;
         this.totalrecords = result.totalRecordsCount ;
         this.showData = this.accountList.length > 0 ? true : false ;
         this.totalPage = Math.ceil(this.totalrecords / this.recordsPerPage);
         console.log('this.totalPage' , this.totalPage);
         console.log('Done inner method');
        }).catch(error =>{
            console.log(error);
        })

    }

    handlePrevious(){
        if(this.currentPage > 1){
            this.currentPage = this.currentPage - 1 ;
            this.offSet = ( this.currentPage - 1 ) * this.recordsPerPage ; 
            this.fetchAccountData();
        }
        
    }
    handleNext(){
        if(this.currentPage < this.totalPage){
            console.log('Enter');
            this.currentPage = this.currentPage + 1 ;
            this.offSet = ( this.currentPage - 1 ) * this.recordsPerPage ;
            console.log('Enter offset');
            this.fetchAccountData(); 
            console.log('method done');
        }

    }

   

    /*
    Wired call
    @wire(fetchData, { stageName: '$selectedStage' })
    wiredOpportunities({ data, error }) {
        if (data) {
            // Assign retrieved opportunities
            this.opportunities = data;
        } else if (error) {
             console.log(error);
        }
    }

    @wire(fetchData)
    wiredOpportunities({ data, error }) {
        if (data) {
            // Assign retrieved opportunities
            this.opportunities = data;
        } else if (error) {
              console.log(error);
        }
    }

  Imperative Call
   fetchData({ stageName: this.selectedStage })
            .then((result) => {
                // Assign retrieved opportunities
                this.opportunities = result;
            })
            .catch((error) => {
                 
            });

    fetchData()
            .then((result) => {
                // Assign retrieved opportunities
                this.opportunities = result;
            })
            .catch((error) => {
                 
            });

    */
}