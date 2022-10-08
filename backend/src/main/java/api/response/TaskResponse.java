package api.response;

import java.util.List;

import api.model.Task;

public class TaskResponse {
	
	private int statusCode;
	private String message;
	private Task task;
	private List<Task> tasks;

	public TaskResponse(int statusCode, String message, Task task) {
		this.statusCode = statusCode;
		this.message = message;
		this.task = task;
	}

	public TaskResponse(int statusCode, String message, List<Task> tasks) {
		this.statusCode = statusCode;
		this.message = message;
		this.tasks = tasks;
	}
	
	public TaskResponse(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Task getTask() {
		return task;
	}
	
	public void setTask(Task task) {
		this.task = task;
	}
	
	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
}
