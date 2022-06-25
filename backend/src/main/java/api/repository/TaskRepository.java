package api.repository;

import java.util.List;

import api.model.Task;

public interface TaskRepository {

	void save(Task task);
	
	Task getById(long id);
	
	List<Task> findAllPenddingTasks(boolean status);
	
	List<Task> findAllFinishedTasks(boolean status);
	
	void delete(long id);
	
}
