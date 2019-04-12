Rails.application.routes.draw do
  get 'static_page/home'
  root "static_page#home"
end
