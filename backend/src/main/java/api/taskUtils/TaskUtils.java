package api.taskUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import api.model.Task;
import api.response.TaskResponse;
import jakarta.servlet.http.HttpServletRequest;
import utils.ServletUtils;

public class TaskUtils {

	public static TaskResponse getOneTaskFromAResultSet(ResultSet resultSet) {
		Task task = new Task();
		
		try {
			while (resultSet.next()) {
				task.setId(resultSet.getLong("id"));
				task.setName(resultSet.getString("name"));
				task.setDescription(resultSet.getString("description"));
				task.setStatus(resultSet.getBoolean("status"));
			}
		} catch (SQLException e) {
			return new TaskResponse(500, "Something goes wrong in the result set reading!", null, null);
		}
		
		return new TaskResponse(200, "Task retrived with success!", task, null);
	}
	
	public static TaskResponse getTasksFromAResultSet(ResultSet resultSet) {
		List<Task> tasks = new ArrayList<Task>();
		
		try {
			while (resultSet.next()) {
				Task task = new Task();
				task.setId(resultSet.getLong("id"));
				task.setName(resultSet.getString("name"));
				task.setDescription(resultSet.getString("description"));
				task.setStatus(resultSet.getBoolean("status"));
				tasks.add(task);
			}
		} catch (SQLException e) {
			return new TaskResponse(500, "Something goes wrong in the result set reading!", null, null);
		}
		
		return new TaskResponse(200, "Tasks retrived with success!", null, tasks);
	}
	
	public static long getIdFromJsonObject(HttpServletRequest request) {
		JsonObject requestBody = ServletUtils.getBodyAsJson(request);
		JsonElement taskDescriptionAsJson = requestBody.get("id");
		long id = taskDescriptionAsJson.getAsLong();
		return id;
	}
	
}
