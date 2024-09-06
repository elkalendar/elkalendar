<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Models\ScheduleExclusion;
use Modules\Availability\Http\Requests\StoreScheduleExclusionRequest;
use Modules\Availability\Http\Requests\UpdateScheduleExclusionRequest;

class ScheduleExclusionController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // TODO: implement schedule exclusions
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleExclusionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ScheduleExclusion $scheduleExclusion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ScheduleExclusion $scheduleExclusion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleExclusionRequest $request, ScheduleExclusion $scheduleExclusion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScheduleExclusion $scheduleExclusion)
    {
        //
    }
}
