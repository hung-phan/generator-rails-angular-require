module API
  module V1
    class PersonApi < Grape::API
      include API::V1::Defaults

      helpers do
        def current_user
          true
        end

        def authenticate!
          error!('401 Unauthorized', 401) unless current_user
        end
      end

      # GET /api/v1/people

      resource :people do
        # GET /api/v1/people
        desc "Get all people"
        get "/" do
          Person.all
        end

        # GET /api/v1/people/:id
        desc "Retrieve person with id"
        get "/:id" do
          Person.find(params[:d])
        end

        # POST /api/v1/people/
        desc "Create person"
        post "/" do
          Person.create(params[:data])
        end
      end
    end
  end
end

