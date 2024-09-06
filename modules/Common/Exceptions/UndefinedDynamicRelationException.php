<?php

declare(strict_types=1);

namespace Modules\Common\Exceptions;

use Exception;

class UndefinedDynamicRelationException extends Exception
{
    public function __construct(string $relation)
    {
        parent::__construct();
        $this->message = sprintf("Undefined dynamic relation '%s' called", $relation);
    }
}
