<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyQuestionResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey)
    {

        Gate::denyIf(fn () => Auth::id() !== $survey->user_id, 'Unauthorized action.', 403);

        $questions = SurveyQuestion::where('survey_id', $survey->id)->get(['id', 'question', 'type']);
        $questionIds = $questions->map(fn ($question) => $question->id);
        $answerIds = SurveyAnswer::where('survey_id', $survey->id)->get('id');

        $answers = SurveyQuestionAnswer
            ::whereIn('survey_question_id', $questionIds)
            ->whereIn('survey_answer_id', $answerIds)
            ->get(['survey_question_id', 'answer']);
        
        
        $data = $questions->map(function ($question) use ($answers) {
            $answerData = $answers->where('survey_question_id', $question->id)->values();
            return [
                'question' => $question,
                'answers' => $answerData,
            ];
        });
        
        $data->map(function ($item) {
            if ($item['question']['type'] === 'checkbox') {
                foreach ($item['answers'] as $answer) {
                    $answer['answer'] = json_decode($answer['answer']);
                }
            }
            return $item;
        });

        return [
            'title' => $survey->title,
            'data' => $data
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Survey $survey)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey)
    {
        //
    }
}
