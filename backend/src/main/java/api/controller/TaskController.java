package api.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utils.ServletUtils;

import java.io.IOException;
import java.io.PrintWriter;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import api.model.Task;
import api.response.TaskJsonResponse;
import api.response.TaskResponse;
import api.service.TaskService;
import api.taskUtils.TaskUtils;

@WebServlet("/servlet-api/")
public class TaskController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getMethod();
		String contentType = request.getContentType();
		response.setContentType(contentType);
		PrintWriter writer = response.getWriter();
		String prettyResponse = null;
		
		if(method.equals("PATCH")) {
			prettyResponse = this.doPatch(request, response);
			writer.print(prettyResponse);
		}else {
			super.service(request, response);
		}
		
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		PrintWriter writer = response.getWriter();
		response.setContentType(request.getContentType());
		String prettyResponse = "";
		
		ServletUtils.initialServletGetConfiguration(response, request);
		
		TaskResponse serverResponse = null;
		TaskJsonResponse taskJsonResponse  = new TaskJsonResponse();
		
		String url = ServletUtils.returnRouteFromADisplayName(request.getRequestURI());
		
		if(url.equals("servlet-api/test")) {
			prettyResponse = "<html><body><h2>Task Controller It's Working!</h2></body></html>"; 
		}
		
		if(url.equals("servlet-api/servlet/api/task")) {
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			serverResponse = taskService.getById(id);
		}
		
		if(url.equals("servlet-api/servlet/api/tasks-by-status")) {
			String statusText = request.getParameter("status");
			boolean status = Boolean.parseBoolean(statusText);
			serverResponse = taskService.findAllTasksByStatus(status);
		}
		
		if(url.equals("servlet-api/servlet/api/tasks")) {
			serverResponse = taskService.findAllTasks();
		}
		
		if (serverResponse != null) {
			taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
			
			prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		}
		
		writer.print(prettyResponse);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		PrintWriter printWriter = response.getWriter();
		response.setContentType(request.getContentType());
		
		JsonObject requestBody = ServletUtils.getBodyAsJson(request);
		JsonElement taskDescriptionAsJson = requestBody.get("description");
		JsonElement taskNameAsJson = requestBody.get("name");
		JsonElement taskStatusAsJson = requestBody.get("status");
		
		String taskDescription = taskDescriptionAsJson.getAsString();
		String taskName = taskNameAsJson.getAsString();
		boolean taskStatus = Boolean.parseBoolean(taskStatusAsJson.getAsString());
		
		Task task = new Task(taskName, taskDescription, taskStatus);
		TaskResponse serverResponse = taskService.save(task);
		
		TaskJsonResponse taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
		String prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		
		printWriter.print(prettyResponse);
	}
	
	protected String doPatch(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		String url = ServletUtils.returnRouteFromADisplayName(request.getRequestURI());
		response.setContentType(request.getContentType());
		response.setCharacterEncoding("UTF-8");
		ServletUtils.initialServletGetConfiguration(response, request);
		
		TaskResponse serverResponse = null;
		
		if(url.equals("servlet-api/servlet/api/tasks-by-status")) {
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskStatusAsJson = requestBody.get("status");
			
			boolean taskStatus = Boolean.parseBoolean(taskStatusAsJson.getAsString());
			
			Task task = new Task();
			task.setStatus(taskStatus);
			
			serverResponse = taskService.updateTaskStatus(id, task);
		}
		
		if(url.equals("servlet-api/servlet/api/update-task-name")) {
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskNameAsJson = requestBody.get("name");
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			String name = taskNameAsJson.getAsString();
			serverResponse = taskService.updateTaskName(name, id);
		}
		
		if(url.equals("servlet-api/servlet/api/update-task-description")) {
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskDescriptionAsJson = requestBody.get("description");
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			String description = taskDescriptionAsJson.getAsString();
			serverResponse = taskService.updateTaskDescription(description, id);
		}
		
		TaskJsonResponse taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
		String prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		
		return prettyResponse;
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPut(req, resp);
	}

	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		response.setContentType(request.getContentType());
		PrintWriter writer = response.getWriter();
		ServletUtils.initialServletGetConfiguration(response, request);
		
		String idText = request.getParameter("id");
		long id = Long.parseLong(idText);
		
		TaskResponse serverResponse = taskService.delete(id);
		
		TaskJsonResponse taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
		String prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		
		writer.print(prettyResponse);
	}

}
