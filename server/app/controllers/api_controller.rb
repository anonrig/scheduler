class ApiController < ApplicationController
	@@token = "TOKEN"
	def add
		addedComment = Comment.new(comment_params)
		addedComment.course_id = params[:courseId]
		addedComment.nickname = "Anonymous" if addedComment.nickname.to_s.empty?
		respond_to do |format|
			if params['token'] == @@token
				if addedComment.save
					format.json { render :json => { :code => 200, :message => "Successful.", :nickname => addedComment.nickname}}
				else
					format.json { render :json => { :code => 403, :message => "Comment add failed"}}
				end
			else
				format.json { render :json => { :code => 215, :message => "Bad Authentication"}}
			end
		end
	end
	
	def get
		courseID = params[:courseId]
		comments = Comment.where("course_id = ?", courseID)
		respond_to do |format|
			if params['token'] == @@token
				format.json { render :json => { :code => 200, :data => comments.to_json}}
			else
				format.json { render :json => { :code => 215, :message => "Bad Authentication"}}
			end
		end
	end
	
	def comment_params
      params.require(:comment).permit(:commentText, :nickname)
    end
end
