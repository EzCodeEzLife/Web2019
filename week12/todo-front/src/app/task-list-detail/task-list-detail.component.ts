import { Component, OnInit } from '@angular/core';
import { ITaskList } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list-detail',
  templateUrl: './task-list-detail.component.html',
  styleUrls: ['./task-list-detail.component.scss']
})
export class TaskListDetailComponent implements OnInit {


  public id: number = 0;

  public taskList: any = {}

  constructor(
    private provider: ProviderService,
    private router: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    if(this.id){
      this.provider.getTaskListDetail(this.id).then(res => {
        this.taskList = res
      })
    }

  }
  navigateBack(){
    this.location.back()
  }

  updateTaskList(){
    this.provider.updateTaskList(this.taskList).then(res => {
      this.taskList = res
    })
  }

  deleteTaskList(){
    this.provider.deleteTaskList(this.taskList.id).then(() => {
      this.location.back()
    })
  }

}