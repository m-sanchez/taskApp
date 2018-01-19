import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Task} from '../core/task.model';
import {environment} from '../../environments/environment';

@Injectable()
export class TaskService {
  public tasksSubject = new Subject<Task[]>();
  tasks: Task[];
  constructor(private http: HttpClient) {
  }

  updateTasks() {
    this.http.get<any>(environment.apiUrl).subscribe(tasksResult => {
      this.tasks = tasksResult.documents.map(task => {
        return new Task(task.fields.title.stringValue, task.fields.description.stringValue, task.name);
      });
      this.tasksSubject.next(this.tasks);
    });
  }

  addTask(task: Task) {
    this.tasks.push(new Task(task.fields.title.stringValue, task.fields.description.stringValue, null, true));
    this.tasksSubject.next(this.tasks);
    this.http
      .post(environment.apiUrl, task).subscribe((taskCreated: Task) => {
      this.tasks.pop();
      this.tasks.push(new Task(taskCreated.fields.title.stringValue, taskCreated.fields.description.stringValue, taskCreated.name));
      this.tasksSubject.next(this.tasks);
    });
  }

  deleteTask(task: Task) {
    return this.http
      .delete(environment.apiUrl + '/' +  task.getId());
  }

}
