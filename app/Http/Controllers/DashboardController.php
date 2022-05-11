<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $surveys =
            Survey::with([
                'answers' => fn ($query) =>
                $query->orderBy('end_date', 'DESC')
            ])
            ->where('user_id', Auth::id())
            ->orderBy('created_at')
            ->get();
        // // Total de surveys
        $total = $surveys->count();

        // // Última survey
        $latest = $surveys->last();

        $answers = $surveys->map(fn ($survey) => $survey->answers);
        // Total de respuestas
        $totalAnswers = $answers->count();

        // Últimas 5 respuestas
        $latestAnswers = $answers
            ->take(5)
            ->flatten(); // Se combinan los arrays de respuestas

        return [
            //'test' => $latestAnswers->flatten(),
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers),
        ];
    }
}
