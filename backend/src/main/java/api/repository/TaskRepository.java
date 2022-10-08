package api.repository;

import api.model.Task;
import api.response.TaskResponse;

public interface TaskRepository {

	TaskResponse save(Task task);
	
	TaskResponse getById(long id);
	
	TaskResponse findAllTasksByStatus(boolean status);
	
	TaskResponse delete(long id);
	
}
