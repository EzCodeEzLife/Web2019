import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import { ITaskList, ITaskOne, ITaskMore, ITaskNew } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/', {});
  }

  getTaskListDetail(id: number): Promise<ITaskList> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/`, {});
  }


  createTaskList(name: any): Promise<ITaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', {
      name: name
    });
  }

  updateTaskList(taskList: ITaskList): Promise<ITaskList> {
    return this.put(`http://127.0.0.1:8000/api/task_lists/${taskList.id}/`, {
      name: taskList.name
    });
  }

  deleteTaskList(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/api/task_lists/${id}/`, {});
  }

  
  getTaskListTasks(id: number): Promise<ITaskOne[]> {
    return this.get(`http://127.0.0.1:8000/api/task_lists/${id}/tasks/`, {});
  }



  getTaskDetail(id: number): Promise<ITaskMore> {
    return this.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }

  createTask(taskListId: number, name: string, due_on: string, status: string): Promise<ITaskNew> {
    return this.post(`http://127.0.0.1:8000/api/task_lists/${taskListId}/tasks/`, {
      name: name,
      due_on: due_on,
      status: status
    });
  }

  updateTask(task: ITaskNew): Promise<ITaskNew> {
    return this.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      name: task.name,
      due_on: task.due_on,
      status: task.status
    });
  }

  deleteTask(id: number): Promise<any> {
    return this.delet(`http://127.0.0.1:8000/api/tasks/${id}/`, {});
  }
}