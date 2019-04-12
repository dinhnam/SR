class AddPathToSpeeches < ActiveRecord::Migration[5.2]
  def change
    add_column :speeches, :path, :string
  end
end
