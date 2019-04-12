class Word < ApplicationRecord
  has_many :speeches, dependent: :destroy

  def add_speech speech
    speeches << speech
  end

  def remove_speech speech
    speeches.delete speech
  end

  def speech_exist? speech
    speeches.include? speech
  end

end
