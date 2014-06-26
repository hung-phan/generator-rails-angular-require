module API
  module V1
    class ObjectApi < Grape::API
      version 'v1'
      format :json

      helpers do
        def password
          "secret"
        end

        def current_passenger
          # supposing no authentication for now
          true
        end

        def authenticate!
          error!('401 Unauthorized', 401) unless current_passenger
        end
      end

      # GET /api/v1/object

      resource :my_object do
        # GET /api/v1/object
        desc "Get all passengers."
        get "/" do
          MyObject.all
        end

        # GET /api/v1/object/:args
        desc "Retrieve system generated password based on phone"
        get "/:arg" do
          MyObject.where(data: params[:arg])
        end

        desc "Create passenger record with phone number"
        post "/create" do
          MyObject.create(params[:data])
        end
      end
    end
  end
end

