import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import { Monitors } from 'src/app/monitors/monitors.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-my-monitor-jobs',
  templateUrl: './my-monitor-jobs.component.html',
  styleUrls: ['./my-monitor-jobs.component.scss']
})
export class MyMonitorJobsComponent implements OnInit {

  monitors : Monitors[] 
  monitor: Monitors
  totalMonitorsCount : number
  deleteStatus : string
  isSuccess : boolean = false;
   mySubscription
  constructor(private dataService : DataService,
    private router : Router,

    

    ) { }

  ngOnInit() {

     this.getAllMonitors();
  //  // this.interval();
  //   this.refresh = setInterval( ()=> {
  //     this.getAllMonitors();
  //     console.log('1234')
  //   },2000
  //   );


  }


  ngOnDestroy(){
    
  }

  getAllMonitors()
  {
    this.dataService.getAllApi().subscribe(
      response => {
       this.monitors = response  
     }
    )
    
    
  }

  startRun(id){
    console.log(id+"    start run")

    this.dataService.runUrls(id).subscribe(
      response => {
       this.monitor = response 
       alert("Execution Started")   
     }
    )
  }

  stopRun(id){
    console.log(id + " stopped");
    this.dataService.stopUrls(id).subscribe(
      response =>
        alert("Stopped")
    )
    this.ngOnInit();
  }

  editMonitor(id){

    this.router.navigate(['buildmonitor',id])
  }


    deleteMonitor(id){
      
        this.dataService.deleteApi(id).subscribe(
          data => {
            this.deleteStatus = "Deleted Successfully";
           this.ngOnInit();
          } 
        )

    }

    // saveMonitor() {
    //   if(this.id == -1) { //=== ==
    //     this.todoService.createTodo('in28minutes', this.todo)
    //         .subscribe (
    //           data => {
    //             console.log(data)
    //             this.router.navigate(['todos'])
    //           }
    //         )
    //   } else {
    //     this.dataService.updateTodo('in28minutes', this.id, this.todo)
    //         .subscribe (
    //           data => {
    //             console.log(data)
    //             this.router.navigate(['todos'])
    //           }
    //         )
    //   }
    // }
  
  }
   
    

