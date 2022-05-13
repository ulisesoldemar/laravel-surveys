<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'data',
        'type',
        'survey_id',
        'description',
    ];

    // Relación 1:n 
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function questionAnswers()
    {
        return $this->belongsTo(SurveyQuestionAnswer::class);
    }
}
