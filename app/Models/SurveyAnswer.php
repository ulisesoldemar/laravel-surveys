<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SurveyAnswer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'survey_id',
        'start_date',
        'end_date'
    ];

    protected $with = ['survey'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    // Implementado mutator
    protected function endDate(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (new DateTime($value))->format('Y-m-d H:i:s')
        );
    }
}
