<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class OAuthcontroller extends Controller
{
    /**
     * Redirect the user to the Provider authentication page.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }

        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url,
        ]);
    }

    /**
     * Obtain the user information from Provider.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function handleProviderCallback($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }

        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
                'status' => true,
            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar()
            ]
        );
        $token = $userCreated->createToken('Login token')->accessToken;

        Auth::login($userCreated);

        return response()->json($userCreated, 204, [
            'access_token' => $token
        ]);
    }

    /**
     * @param $provider
     * @return JsonResponse
     */
    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'github', 'google'])) {
            return response()->json([
                'error' => 'Please login using facebook, github or google',
                'provider' => $provider,
            ], 422);
        }
    }
}
