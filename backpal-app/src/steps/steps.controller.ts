import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  @Auth(AuthType.None)
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepsService.create(createStepDto);
  }
  @Get('/progress')
  @Auth(AuthType.None)
  findAllByJourneyIdAndUserId(
    @Query('journeyId') journeyId: number,
    @Query('userId') userId: string,
  ) {
    return this.stepsService.findAllByJourneyIdAndUserId(journeyId, userId);
  }
  @Get()
  @Auth(AuthType.None)
  findAllByJourneyId(@Query('journeyId') journeyId: number) {
    return this.stepsService.findAllByJourneyId(journeyId);
  }

  @Get(':id')
  @Auth(AuthType.None)
  findOne(@Param('id') id: string) {
    return this.stepsService.findOne(+id);
  }

  @Post(':id')
  @Auth(AuthType.None)
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id);
  }
}
