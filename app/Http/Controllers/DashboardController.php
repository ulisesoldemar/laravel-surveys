<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Models\Survey;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $surveys = Survey::with('answers')
            ->where('user_id', Auth::id())
            ->orderBy('created_at')
            ->get();
        // // Total de surveys
        $total = $surveys->count();

        // // Última survey
        $latest = $surveys->last();

        $answers = $surveys
            ->map(fn ($survey) => $survey->answers)
            ->flatten();
        // Total de respuestas
        $totalAnswers = $answers->count();

        // Últimas 5 respuestas
        $latestAnswers = $answers
            ->sortByDesc('end_date')
            ->values()
            ->take(5); // Se combinan los arrays de respuestas

        return [
            // 'test' => $sortedAnswers,
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyDashboardResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers),
        ];
    }
}
