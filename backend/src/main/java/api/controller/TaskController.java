package api.controller;

import jakarta.servlet.ServletException;
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
		
		ServletUtils.initialServletGetConfiguration(response, request);
		
		TaskResponse serverResponse = null;
		TaskJsonResponse taskJsonResponse  = new TaskJsonResponse();
		
		String url = ServletUtils.returnRouteFromADisplayName(request.getRequestURI());
		
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
		
		taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
		
		String prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		
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
		
		String taskDescription = taskDescriptionAsJson.getAsString();
		String taskName = taskNameAsJson.getAsString();
		
		Task task = new Task(taskName, taskDescription, false);
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
		
		TaskResponse serverResponse = null;
		
		if(url.equals("servlet-api/servlet/api/update-to-done")) {
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			serverResponse = taskService.updateTaskToDone(id);
		}
		
		if(url.equals("servlet-api/servlet/api/update-to-pending")) {
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			serverResponse = taskService.updateTaskToPendding(id);
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
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		response.setContentType(request.getContentType());
		PrintWriter writer = response.getWriter();
		
		String idText = request.getParameter("id");
		long id = Long.parseLong(idText);
		
		TaskResponse serverResponse = taskService.delete(id);
		
		TaskJsonResponse taskJsonResponse = TaskUtils.convertApiResponseToJson(serverResponse);
		String prettyResponse = ServletUtils.gsonBuilder().toJson(taskJsonResponse);
		
		writer.print(prettyResponse);
	}

}