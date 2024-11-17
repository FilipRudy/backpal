import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';

@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Post()
  @Auth(AuthType.None)
  create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeysService.create(createJourneyDto);
  }

  @Get()
  @Auth(AuthType.None)
  findAll() {
    return this.journeysService.findAll();
  }
  @Get('/user/:id')
  @Auth(AuthType.None)
  findAllStartedByUserId(@Param('id') id: string) {
    return this.journeysService.findAllStartedByUserId(id);
  }
  @Get('/steps')
  @Auth(AuthType.None)
  findJourneysWithSteps() {
    return this.journeysService.findJourneysWithSteps();
  }
  @Get(':id')
  @Auth(AuthType.None)
  findOne(@Param('id') id: string) {
    return this.journeysService.findOne(+id);
  }

  @Get('/steps/:id')
  @Auth(AuthType.None)
  findJourneyWithSteps(@Param('id') id: string) {
    return this.journeysService.findJourneyWithSteps(+id);
  }

  @Post(':id')
  @Auth(AuthType.None)
  update(@Param('id') id: string, @Body() updateJourneyDto: UpdateJourneyDto) {
    return this.journeysService.update(+id, updateJourneyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journeysService.remove(+id);
  }
}
